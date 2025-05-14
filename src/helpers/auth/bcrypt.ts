import bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}

export async function hashPasswordAsync(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
}

export async function comparePasswordAsync(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}