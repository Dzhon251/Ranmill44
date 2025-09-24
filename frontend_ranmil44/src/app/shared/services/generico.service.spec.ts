import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { GenericoService } from './generico.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('GenericoService', () => {
  let service: GenericoService<any>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GenericoService,
        { provide: 'url', useValue: 'http://test.com' },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(GenericoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all items', () => {
    service.buscarTodos().subscribe();

    const req = httpMock.expectOne('http://test.com');
    expect(req.request.method).toBe('GET');
  });

  it('should fetch item by id', () => {
    service.buscarPorId(1).subscribe();

    const req = httpMock.expectOne('http://test.com/1');
    expect(req.request.method).toBe('GET');
  });

  it('should create an item', () => {
    service.crear({}).subscribe();

    const req = httpMock.expectOne('http://test.com');
    expect(req.request.method).toBe('POST');
  });

  it('should update an item', () => {
    service.actualizar({}).subscribe();

    const req = httpMock.expectOne('http://test.com');
    expect(req.request.method).toBe('PUT');
  });

  it('should delete an item by id', () => {
    service.eliminarPorId(1).subscribe();

    const req = httpMock.expectOne('http://test.com/1');
    expect(req.request.method).toBe('DELETE');
  });
});
