export declare function generateHash(password: string): string;
export declare function validateHash(password: string | undefined, hash: string | undefined): Promise<boolean>;
export declare function getVariableName<TResult>(getVar: () => TResult): string;
