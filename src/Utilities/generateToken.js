export const resetExpiration = () => {
    const resetTokenExpiry = Date.now() + 3600000;
    return resetTokenExpiry
}