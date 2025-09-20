type ReactRef<T> = React.RefObject<T | null>;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type { ReactRef, ReactSetState };
