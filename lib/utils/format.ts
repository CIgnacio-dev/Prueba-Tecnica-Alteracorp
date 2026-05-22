export const formatCLP = (value: number): string => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency', currency: 'CLP'
    }).format(value);
}