export function useNetworkErrorMessage(error: any): string | undefined {
  if(error?.data?.error){
    const err = error.data.error
    if(typeof err === 'string'){
      return err
    }

    if(err?.message){
      return Object.values(err.message[0].constraints)[0] as string
    }
  }
  return
}