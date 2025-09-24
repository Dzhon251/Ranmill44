package ec.mil.ejercito.dimt.dhp.mcsv.dimt.dhp.service.impl;

import java.util.List;

public interface IBaseServicio<T, ID> {
    public T crear(T entidad);

    public T actualizar(T entidad);

    public void eliminar(ID id);

    public T buscarPorId(ID id);


    //public List<T> buscarPorEstado(char estado);

    public List<T> buscarTodos();

    public List<T> buscarPorPaginado(int numeroDePagina, int cantidadDeRegistros);

    public void limpiarCache();

    List<T> findAllByEstado(char estado);


}

