# ignore me for now
theme-default:
	@npx lerna run build --stream --scope=@clair/theme-default

# 集成各种次要依赖
__prepare__:
	@bash ./scripts/smarter-prepare.sh `bash ./scripts/deps.sh vue,react`

# 构建 vue 和 react
build: __prepare__
	@npx lerna run build --stream --parallel --scope=@clair/{vue,react}

# 开发 vue
vue_dev: __prepare__
	@npx lerna run start --stream --scope=@clair/vue

# 开发 react
react_dev: __prepare__
	@npx lerna run start --stream --scope=@clair/react

