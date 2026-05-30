export async function spawnGitInitBare({ repoPath }: { repoPath: string }) {
  const gitProcess = Bun.spawn(["git", "init", "--bare", repoPath]);

  const output = await gitProcess.stdout.text();
  return output;
}
