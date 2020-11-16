import { PACKAGE_NAME_MAP, PACKAGE_JSONS } from './const'
export class Package {
  constructor(name) {
    this.name = this.normalizeName(name)
    this.packageJson = this.getPackageJson()
    const allDeps = this.getDeps()
    // circular reference is not considered
    this.deps = this.filterOutExternalDeps(allDeps).map(dep => new Package(dep))
  }

  normalizeName(name) {
    return name in PACKAGE_NAME_MAP ? PACKAGE_NAME_MAP[name] : name
  }

  getPackageJson() {
    return PACKAGE_JSONS.find(json => json.name === this.name)
  }

  getDeps() {
    return Object.keys(this.dependencies)
  }

  filterOutExternalDeps(deps) {
    return deps.filter(dep => PACKAGE_JSONS.some(json => json.name === dep))
  }

  get dependencies() {
    return this.packageJson.dependencies || {}
  }

  get scripts() {
    return this.packageJson.scripts || {}
  }

  get buildable() {
    return 'build' in this.scripts
  }

  get startable() {
    return 'start' in this.scripts
  }
}
