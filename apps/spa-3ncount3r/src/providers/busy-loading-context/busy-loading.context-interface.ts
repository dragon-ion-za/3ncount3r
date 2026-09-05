export interface IBusyLoadingContext {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    getIsLoading: () => boolean;
}