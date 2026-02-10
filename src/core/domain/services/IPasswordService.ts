export interface IPasswordService {
    /**
     * Hashes a password for secure storage
     * @param password Plain text password
     * @returns Hashed password
     */
    hash(password: string): Promise<string>;

    /**
     * Compares a plain text password with a hash
     * @param password Plain text password
     * @param hash Hashed password to compare against
     * @returns True if they match, false otherwise
     */
    compare(password: string, hash: string): Promise<boolean>;
}
