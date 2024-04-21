type OptionalKeys<T, keys extends keyof T> = Partial<Pick<T, keys>> & Omit<T, keys>
type RequiredKeys<T, keys extends keyof T> = Required<Pick<T, keys>> & Omit<T, keys>
