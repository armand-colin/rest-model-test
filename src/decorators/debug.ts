interface Type<T> {
    instance: T;
    new (...args: any[]): T;
}

export function debug<T>(target: Type<T>, customName?: string) {
    Object.defineProperty(window, customName ?? target.name, { get: () => target.instance })
}   