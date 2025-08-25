export class ErrorResult<T> {
  private constructor(public readonly error: T) {}

  ok(): this is OKResult<never> {
    return false;
  }

  static create<T>(error: T): ErrorResult<T> {
    return new ErrorResult(error);
  }
}

export class OKResult<T> {
  private constructor(public readonly data: T) {}

  ok(): this is OKResult<T> {
    return true;
  }

  static create<T>(data: T): OKResult<T> {
    return new OKResult(data);
  }
}

export type ServiceResult<E, D> = ErrorResult<E> | OKResult<D>;
