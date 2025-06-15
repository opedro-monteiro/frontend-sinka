import { OrbitProgress } from 'react-loading-indicators'

export function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <OrbitProgress
        variant="dotted"
        dense
        color="#32cd32"
        size="large"
        text="Carregando"
        textColor="#15ff00"
      />
    </div>
  )
}
