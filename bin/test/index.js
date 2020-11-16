import { preBuild } from '../preBuild'
import { spawn } from '../utils/spawn'

const index = async () => {
  // run preBuild in serial to avoid accidentally clear shared de
  await preBuild(['vue', 'react'])
  const script = `lerna run test --stream --parallel`
  return spawn('yarn', script.split(' '), {
    stdio: 'inherit',
    shell: true
  })
}

index().catch(error => {
  throw error
})
