export const beautify = (error: string) =>{
    return error.replace('_',' ').replace(/\[(.*?)\]./, ' ')
}