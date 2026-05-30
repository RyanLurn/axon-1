export async function spawnGitReceivePackAdvertisement({
  repoPath,
}: {
  repoPath: string;
}) {
  const gitProcess = Bun.spawn([
    "git",
    "receive-pack",
    "--http-backend-info-refs",
    repoPath,
  ]);

  const output = await gitProcess.stdout.text();
  return output;
}
