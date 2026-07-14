# Claude Code Learning Checklist

Working checklist to cover one topic at a time. Check things off as we go hands-on with them.

> Note: an earlier claim in conversation that Copilot has "no skills/subagents/slash commands/session resume" was **wrong** — that was stale (pre-2026) knowledge. Copilot has converged significantly. The comparison section below reflects corrected, researched info (July 2026) — but this space moves fast, so treat it as a snapshot, not gospel.

## Core mechanics (learn these first)
- [ ] Keyboard shortcuts (`Shift+Tab` mode cycling, `Ctrl+D` exit, arrow-key history, `Tab` autocomplete)
- [ ] Permission modes (Manual / Accept Edits / Plan / Auto / Bypass)
- [ ] Plan Mode workflow (plan file, `ExitPlanMode` approval)
- [ ] Slash commands (`/help`, `/resume`, `/clear`, `/diff`, `/context`, `/model`, `/status`)
- [ ] `!` prefix — run a shell command yourself, directly, bypassing me
- [ ] `@` syntax — reference a file/directory to pull into a prompt
- [ ] Session resume (`claude -c`, `claude -r`, `/resume`)
- [ ] CLAUDE.md — project-level config/instructions file
- [ ] IDE integration — VS Code/JetBrains extension, auto-connect when `claude` runs in the integrated terminal, inline diff viewer

## Agentic features
- [ ] Subagents / the Agent tool (Explore, Plan, general-purpose, specialized agents)
- [ ] Skills — reusable capability packages (e.g. `/code-review`, `/deep-research`)
- [ ] Multi-agent Workflows — deterministic orchestration scripts (pipeline/parallel fan-out)
- [ ] Background tasks — long-running commands with completion notifications
- [ ] Hooks — shell commands triggered on events (e.g. before/after tool calls)
- [ ] MCP servers — connecting external tools/data sources
- [ ] Memory system — persistent facts remembered across separate conversations (what I've been using with you this whole time)
- [ ] Scheduled/autonomous agents — cron-based routines, `/loop`
- [ ] Artifacts — publishing standalone HTML/Markdown pages as shareable output

## How this compares to GitHub Copilot (researched July 2026 — corrected from my earlier wrong claim)

**Copilot now has some real version of most of this too** — it is not just "autocomplete plus chat" anymore:
- Agent mode with MCP support (GA)
- Custom instructions (`.github/copilot-instructions.md`, path-specific instruction files) — Copilot's rough equivalent of CLAUDE.md
- Specialized sub-agents running in parallel (Explore/Task/Plan/Code-review agents in Copilot CLI)
- Plan mode, autopilot mode, "fleet mode" (parallel sub-agents)
- Slash commands (`/remote`, `/compact`, `/chronicle`, etc.)
- Its own memory system (Copilot Memory) — though notably it **auto-expires unused facts after 28 days**, unlike Claude Code's memory which persists until removed

**Where real differences likely still exist** (worth verifying hands-on rather than trusting this list blindly):
- Claude Code's memory has no auto-decay — it's durable until explicitly edited/removed
- Claude Code's Artifacts (publishable standalone pages) — no clear Copilot equivalent found
- Exact workflow/orchestration model (pipeline vs. parallel scripting) differs in mechanics even where both have "multi-agent" features
- Product philosophy differs: Claude Code is Anthropic's own harness end-to-end; Copilot integrates multiple model providers, so behavior/tooling is GitHub's design layered on top of whichever model you pick

**Bottom line:** the meaningful difference today is less "features Copilot lacks entirely" and more "how each harness implements similar ideas, and which model is doing the reasoning underneath." Worth re-verifying claims like this periodically since both products ship fast.
