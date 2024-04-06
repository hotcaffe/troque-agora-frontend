function formatValue(type: 'number' | 'currency' | 'date' | 'boolean', value: any) {
    switch(type) {
        case 'number':
            return value?.toLocaleString();
        case 'currency':
            return Number(value)?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        case 'date':
            return new Date(value).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        case 'boolean':
            return value ? 'Sim' : 'Não';
        default:
            return value;
    }
}

export {formatValue}