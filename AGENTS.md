<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application security
- Keep private credentials inside server-function handlers; browser publishable keys and public analytics IDs are not secrets.
- Shop messages accept anonymous INSERT only with bounded content checks; deny anonymous/authenticated reads, updates and deletes because only the passcode-verified owner inbox may read private customer messages.
