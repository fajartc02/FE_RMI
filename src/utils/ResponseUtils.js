export const constructError = (error) => {
  return error?.response?.data?.status?.message || error.message || "Hubungi Developer"
}
