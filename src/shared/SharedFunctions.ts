export const mapOptionLabel = (options: Record<string, string>): { label: string; value: string }[] => {
    return Object.values(options).map(status => ({ label: status.replace(/_/g, ' '), value: status }));
};