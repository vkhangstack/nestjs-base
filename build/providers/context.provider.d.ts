import type { UserEntity } from '../modules/user/user.entity';
export declare class ContextProvider {
    private static readonly nameSpace;
    private static readonly authUserKey;
    private static readonly languageKey;
    private static get;
    private static set;
    private static getKeyWithNamespace;
    static setAuthUser(user: UserEntity): void;
    static getAuthUser(): UserEntity | undefined;
}
