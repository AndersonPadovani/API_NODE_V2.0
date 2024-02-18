import * as Crypto from "crypto";

export function PasswordEncript(password: string): string {
    const hash = Crypto.createHash("sha1");
    hash.update(password);

    return hash.digest("hex");
}
