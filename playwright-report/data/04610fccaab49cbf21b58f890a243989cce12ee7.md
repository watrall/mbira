# Page snapshot

```yaml
- dialog "Unhandled Runtime Error" [ref=e4]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - navigation [ref=e8]:
          - button "previous" [disabled] [ref=e9]:
            - img "previous" [ref=e10]
          - button "next" [disabled] [ref=e12]:
            - img "next" [ref=e13]
          - generic [ref=e15]: 1 of 1 error
          - generic [ref=e16]:
            - text: Next.js (14.2.5) is outdated
            - link "(learn more)" [ref=e18] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - button "Close" [ref=e19] [cursor=pointer]:
          - img [ref=e21]
      - heading "Unhandled Runtime Error" [level=1] [ref=e24]
      - paragraph [ref=e25]: "Error: either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!"
    - generic [ref=e26]:
      - heading "Source" [level=2] [ref=e27]
      - generic [ref=e28]:
        - link "src/lib/supabase/server.ts (13:41) @ createSupabaseServerComponentClient" [ref=e30] [cursor=pointer]:
          - generic [ref=e31]: src/lib/supabase/server.ts (13:41) @ createSupabaseServerComponentClient
          - img [ref=e32]
        - generic [ref=e36]: "11 | 12 | export const createSupabaseServerComponentClient = () => > 13 | createServerComponentClient<Database>({ cookies }); | ^ 14 | 15 | export const createSupabaseServerActionClient = () => 16 | createServerActionClient<Database>({ cookies });"
      - heading "Call Stack" [level=2] [ref=e37]
      - button "Show collapsed frames" [ref=e38] [cursor=pointer]
```