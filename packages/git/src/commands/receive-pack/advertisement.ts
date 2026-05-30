export async function spawnGitReceivePackAdvertisement({
  repoPath,
}: {
  repoPath: string;
}) {
  const gitProcess = Bun.spawn(
    ["git", "receive-pack", "--http-backend-info-refs", repoPath],
    {
      stdout: "pipe",
      stderr: "pipe",
    }
  );

  const exitCode = await gitProcess.exited;
  const output = await gitProcess.stdout.text();
  const error = await gitProcess.stderr.text();

  return {
    exitCode,
    output,
    error,
  };
}
