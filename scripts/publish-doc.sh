tagname=$(git describe --tags)
npx gh-pages \
  --repo https://"$GH_TOKEN"@github.com/clair-design/clair-design.github.io.git \
  --branch master \
  --dist .site \
  --tag $tagname

echo "Site published: https://clair-design.github.io"
