export const Helper = {
    SQLobjectToObject
}
async function SQLobjectToObject(data: any): Promise<any> {
    return await JSON.parse(JSON.stringify(data));
}