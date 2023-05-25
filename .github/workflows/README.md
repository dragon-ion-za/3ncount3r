## Testing the pipelines
- Open WSL
- Make sure Act is installed (https://github.com/nektos/act)
- Navigate to the Github Actions folder `cd /mnt/e/Development/Git/3ncount3r/`
- Run the act command
  - `act workflow_dispatch -P ubuntu-latest=ghcr.io/catthehacker/ubuntu:pwsh-20.04`