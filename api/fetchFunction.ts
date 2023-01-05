export const basicFetch = async <returnType>(endPoint: string): Promise<returnType> => {
    const response = await fetch(endPoint);
    if (!response.ok) throw new Error("Error!");
    const data = await response.json();
    return data;
}