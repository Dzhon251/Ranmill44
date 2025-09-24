import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, Observable, of, tap } from "rxjs";


@Injectable()
export class SharedEffects {
  constructor(
    private accion$: Actions,
  ) { }

  /**
   * <h4>Función compartida para crear un efecto</h4>
   * @param action$ Acciones que se van a procesar
   * @param actionType Tipo de acción que se desea ejecutar
   * @param serviceMethod Servicio que va a realizar las peticiones HTTP
   * @param headersConfig
   * @param successAction Acción que se ejecutará en caso de que la petición sea exitosa
   * @param errorAction Acción que se ejecutará en caso de que la petición sea fallida
   * @param needsPayload Indica si el servicio necesita un payload para enviar datos
   * @param responseKey Elemento donde se almacenara el resultado de la petición, por ejemplo para
   * {@link gradosMilitares$}, el responseKey debe ser el mismo que las variables que se usan en:
   * - {@link asignarListaGrados}
   * - {@link gradoMilitarReducer}
   **/
  createEffectHandler = (
    action$: Actions,
    actionType: string,
    serviceMethod: (
      payload?: any,
      headersConfig?: HttpHeaders
    ) => Observable<any>,
    successAction: string,
    errorAction: string,
    responseKey: string = 'payload',
    needsPayload = false,
    headersConfig?: HttpHeaders
  ) => {
    return createEffect(
      () =>
        action$.pipe(
          ofType(actionType),
          mergeMap((action: any) =>
            (needsPayload
              ? serviceMethod(action.payload, headersConfig)
              : serviceMethod()
            ).pipe(
              // Descomentar para ver la respuesta de la petición
              tap((response: any) => console.log(response)),
              map((response: any) => ({
                type: successAction,
                [responseKey]: response,
              })),
              catchError((error: any) =>
                of({
                  type: errorAction,
                  error: error.error,
                })
              )
            )
          )
        ),
      { dispatch: true }
    );
  };
}
