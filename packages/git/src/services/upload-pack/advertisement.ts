export async function spawnUploadPackAdvertisement(repoPath: string) {
  const gitProcess = Bun.spawn(
    ["git", "upload-pack", "--http-backend-info-refs", repoPath],
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
