package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service;


import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.repository.GenericoRepositorio;
import ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.impl.IBaseServicio;
import jakarta.persistence.*;
import org.springframework.cache.annotation.*;
import org.springframework.cache.annotation.Cacheable;

import java.lang.reflect.ParameterizedType;
import java.util.List;

public abstract class BaseServicio<T, ID> implements IBaseServicio<T, ID> {
    protected abstract GenericoRepositorio<T, ID> getRepositorio();

    @PersistenceContext(unitName = "oracle19cEntityManagerFactory")
    private EntityManager entityManagerOracle19c;

    @PersistenceContext(unitName = "oracle11gEntityManagerFactory")
    private EntityManager entityManagerOracle11g;

    @Override
    @Cacheable(value = "#root.target.obtenerClaseDeT()+'.buscarTodos'")
    public List<T> buscarTodos() {
        return getRepositorio().findAll();
    }

    @Override
    @Cacheable(value = "#root.target.obtenerClaseDeT() + '.buscarPorId'", key = "#id")
    public T buscarPorId(ID id) {
        return getRepositorio().findById(id).orElse(null);
    }

    @Override
    @Cacheable(value = "#root.target.obtenerClaseDeT() + '.buscarPorEstado'", key = "#estado")
    public List<T> findAllByEstado(char estado) {
        return getRepositorio().findAllByEstado(estado);
    }

    @Override
    @CacheEvict(value = { "#root.target.obtenerClaseDeT() + '.buscarTodos'",
            "#root.target.obtenerNombreDelPaqueteDeLaEntidad() + '.buscarPorId'" }, allEntries = true)
    public T crear(T entity) {
        return getRepositorio().save(entity);
    }

    @Override
    @CacheEvict(value = { "#root.target.obtenerClaseDeT() + '.buscarTodos'",
            "#root.target.obtenerNombreDelPaqueteDeLaEntidad() + '.buscarPorId'" }, allEntries = true)
    public T actualizar(T entity) {
        return getRepositorio().save(entity);
    }

    @Override
    @CacheEvict(value = { "#root.target.obtenerClaseDeT() + '.buscarTodos'",
            "#root.target.obtenerNombreDelPaqueteDeLaEntidad() + '.buscarPorId'" }, allEntries = true)
    public void eliminar(ID id) {
        T entidad = getRepositorio().findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entidad no encontrada"));

        try {
            // Verificar si la entidad tiene el atributo 'estado'
            entidad.getClass().getDeclaredField("estado");
            // Si tiene el atributo 'estado', actualizarlo a '0'
            entidad.getClass().getMethod("setEstado", Character.class).invoke(entidad, '0');
            getRepositorio().save(entidad);
        } catch (NoSuchFieldException e) {
            // Si no tiene el atributo 'estado', eliminar la entidad
            getRepositorio().deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar la entidad", e);
        }
    }

    @Override
    @CacheEvict(cacheNames = { "#root.target.obtenerClaseDeT() + '.buscarTodos'",
            "#root.target.obtenerNombreDelPaqueteDeLaEntidad() + '.buscarPorId'" }, allEntries = true)
    public void limpiarCache() {

    }

    @Override
    @SuppressWarnings("unchecked")
    public List<T> buscarPorPaginado(int numeroDePagina, int cantidadDeRegistros) {
        String[] baseDeDatos = obtenerNombreDelPaqueteDeLaEntidad().split("\\.");
        EntityManager entityManager = seleccionarEntityManager(baseDeDatos[baseDeDatos.length - 1]);
        int firstResult = numeroDePagina * cantidadDeRegistros;
        String sql = "SELECT * FROM (SELECT t.*, ROWNUM rn FROM (SELECT * FROM " + obtenerNombreTabla(entityManager)
                + ") t WHERE ROWNUM <= " + (firstResult + cantidadDeRegistros) + ") WHERE rn > " + firstResult;
        Class<T> entityClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
                .getActualTypeArguments()[0];
        Query query = entityManager.createNativeQuery(sql, entityClass);
        return query.getResultList();
    }

    @SuppressWarnings("unchecked")
    private String obtenerNombreTabla(EntityManager entityManager) {
        Class<T> entityClass = (Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass())
                .getActualTypeArguments()[0];
        Table table = entityClass.getAnnotation(Table.class);
        return table != null ? table.name() : entityManager.getMetamodel().entity(entityClass).getName();
    }

    @SuppressWarnings("unchecked")
    private String obtenerNombreDelPaqueteDeLaEntidad() {
        Class<T> entityClass = (Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass())
                .getActualTypeArguments()[0];
        Package entityPackage = entityClass.getPackage();
        obtenerClaseDeT();
        return entityPackage.getName();
    }

    private EntityManager seleccionarEntityManager(String baseDeDatos) {
        if ("oracle19c".equals(baseDeDatos)) {
            return entityManagerOracle19c;
        } else if ("oracle11g".equals(baseDeDatos)) {
            return entityManagerOracle11g;
        } else {
            throw new IllegalArgumentException("Base de datos no soportada: " + baseDeDatos);
        }
    }

    @SuppressWarnings("unchecked")
    private String obtenerClaseDeT() {
        return ((Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0])
                .getName();
    }
}

