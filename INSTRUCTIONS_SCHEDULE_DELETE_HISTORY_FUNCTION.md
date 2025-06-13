### Instructions for Deploying and Scheduling `delete-old-history` Function

The code for the Supabase Edge Function `delete-old-history` has been added to your repository at `supabase/functions/delete-old-history/index.ts`.

To make this function operational, you need to:

**1. Set Environment Variables for the Function:**
   - Go to your Supabase Project Dashboard.
   - Navigate to **Edge Functions**.
   - Select the `delete-old-history` function (it should appear after you deploy it in the next step). If it's not there yet, you might need to set these globally or when you deploy.
   - Go to the **Settings** or **Secrets** section for this function.
   - Add the following secrets:
     - `SUPABASE_URL`: Your project's Supabase URL (e.g., `https://<your-project-ref>.supabase.co`).
     - `SUPABASE_SERVICE_ROLE_KEY`: Your project's service role key (found in Project Settings > API).
   *Alternatively, you can set these as project-wide environment variables if your Supabase version supports it easily through the dashboard.*

**2. Deploy the Function:**
   - Ensure you have the [Supabase CLI](https://supabase.com/docs/guides/cli) installed and configured for your project.
   - Open your terminal, navigate to your project's root directory (where your `supabase` folder is).
   - If you haven't already, link your local project to your Supabase project:
     ```bash
     supabase login
     # Follow prompts to log in

     supabase link --project-ref YOUR_PROJECT_REF
     # Replace YOUR_PROJECT_REF with your actual project reference.
     # This can be found in your Supabase project's URL: xxx.supabase.co/project/YOUR_PROJECT_REF
     ```
   - Deploy the specific function:
     ```bash
     supabase functions deploy delete-old-history --no-verify-jwt
     ```
     *(The `--no-verify-jwt` flag is used because this function will be triggered by a cron job, not an authenticated user session, and it uses the `SERVICE_ROLE_KEY` for its operations. This key grants admin privileges, bypassing standard RLS and JWT checks for user authentication.)*

**3. Schedule the Function (Cron Job):**
   - Supabase allows scheduling Edge Functions using cron expressions. You can set this up using the Supabase CLI by editing the `supabase/config.toml` file.

   **Using `supabase/config.toml` (Recommended for version control):**
     - Open or create the `supabase/config.toml` file in your project's root directory.
     - Add or update the functions section to include the schedule for `delete-old-history`:
       ```toml
       # supabase/config.toml

       [functions.delete-old-history]
       # Cron schedule for running daily at 3:00 AM UTC.
       # Format: minute hour day(month) month day(week)
       # Example: "0 3 * * *" means at 03:00 (AM) every day.
       # You can use https://crontab.guru to help build cron expressions.
       schedule = "0 3 * * *"
       ```
     - Save the `config.toml` file.
     - To apply the schedule, you need to deploy your project settings. This typically happens with a general deploy command, but ensure your CLI version supports deploying schedules this way.
       ```bash
       supabase deploy
       # This command may deploy other changes too.
       # Check Supabase CLI documentation for specific commands if you only want to update schedules.
       ```
       *(Note: The method for deploying schedules can evolve. If `supabase deploy` doesn't update the schedule, consult the latest Supabase CLI documentation. Sometimes, function deployments (`supabase functions deploy`) might also refresh associated schedules defined in `config.toml`.)*

   **Alternative: Using Supabase Dashboard (if available for cron jobs):**
     - Some Supabase features become available in the Dashboard over time.
     - Go to your Supabase Project Dashboard.
     - Navigate to **Edge Functions**.
     - Select the `delete-old-history` function.
     - Look for a "Schedule," "Triggers," or "Cron jobs" tab/option.
     - If available, create a new schedule (e.g., daily at 03:00 UTC using the cron expression `0 3 * * *`).

**4. Verify:**
   - **Deployment:** After deploying, check the `delete-old-history` function in your Supabase Dashboard under **Edge Functions**. Ensure it's listed and there are no deployment errors.
   - **Scheduling:** After the configured cron time has passed (e.g., after 3:00 AM UTC if you used `0 3 * * *`):
     - Check your `content_history` table in the Supabase Table Editor to confirm that records older than 7 days have been deleted.
     - Review the function logs. In the Supabase Dashboard, go to **Edge Functions** > `delete-old-history` > **Logs**. Look for invocation logs, messages like "Successfully processed deletion...", or any error messages.

This setup will ensure that your `content_history` table is regularly pruned, keeping it to a manageable size by removing records older than 7 days. Remember that the `SERVICE_ROLE_KEY` should be kept secure, as it provides full access to your Supabase backend.
