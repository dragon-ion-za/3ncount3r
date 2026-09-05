$versionNumber = 'calllightning-cantrip-5'

ubuntu run docker buildx build /mnt/c/Development/dragon-ion-za/3ncount3r/backends/DDD.3ncount3r.API -t "3ncount3r-$versionNumber"
ubuntu run docker buildx build /mnt/c/Development/dragon-ion-za/3ncount3r/backends/DDD.charact3r.API -t "charact3r-$versionNumber"
ubuntu run docker buildx build /mnt/c/Development/dragon-ion-za/3ncount3r/backends/DDD.orch3strator -t "orch3strator-$versionNumber"

ubuntu run docker buildx build /mnt/c/Development/dragon-ion-za/3ncount3r/backends/api-cl3anslat3 -t "cl3anslat3-$versionNumber"

ubuntu run docker buildx build /mnt/c/Development/dragon-ion-za/3ncount3r/ -f /mnt/c/Development/dragon-ion-za/3ncount3r/apps/spa-3ncount3r/Dockerfile -t "spa-3ncount3r-$versionNumber"
ubuntu run docker buildx build /mnt/c/Development/dragon-ion-za/3ncount3r/ -f /mnt/c/Development/dragon-ion-za/3ncount3r/apps/shell/Dockerfile -t "spa-shell-$versionNumber"