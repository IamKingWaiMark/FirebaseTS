export declare class FirebaseTSStorage {
    public upload(params: { uploadName: string, path: string [], data: {data: any, metadata?: firebase.storage.UploadMetadata}, onUpload?: (snapshot?: firebase.storage.UploadTaskSnapshot) => void, onComplete?: (downloadUrl: string) => void, onFail?: (err: any) => void}): Promise<string>;
    public deleteWithUrl(params: {url: string, onComplete?: () => void, onFail?: (err: any) => void}): Promise<void>;
    public delete(params: {path: string [], onComplete?: () => void, onFail?: (err: any) => void}): Promise<void>;
}