# bank

A React Native (Expo) app for viewing recent bank transactions for AEON Bank - Mobile Engineer assessment
This contains a list of latest incoming/outgoing transfers, and a detail screen per transaction with a share action.

## Getting started

Prerequisites: Node.js, and either [Bun](https://bun.sh) (this repo uses `bun.lock`) or npm,
plus the Expo Go app on a physical device, or an iOS Simulator / Android Emulator.

```bash
# install dependencies
bun install          # or: npm install

# start the dev server
bunx expo start       # or: npx expo start
```

From the dev server, press `i` for the iOS Simulator, `a` for the Android Emulator, `w` for web,
or scan the QR code with the **Expo Go** app on your phone.

### Scripts

| Command            | What it does                                       |
| ------------------ | -------------------------------------------------- |
| `bun run start`    | Start the Expo dev server                          |
| `bun run ios`      | Start the dev server and open the iOS Simulator    |
| `bun run android`  | Start the dev server and open the Android Emulator |
| `bun run web`      | Start the dev server for web                       |
| `bun run test`     | Run the Jest test suite                            |
| `npx tsc --noEmit` | Type-check the project                             |

## Architecture

- **Expo Router** for navigation. Routes live in `app/` at the project root and stay thin —
  each route file just renders a screen component from `src/features/.../screens/`. This keeps
  routing (URLs, params, headers) separate from screen implementation.
- **Feature-based structure** under `src/features/<feature>/` (currently just `transactions`),
  each with its own `api/`, `components/`, `screens/`, `store/`, `utils/`, and `types.ts`,
  instead of one global `components/`, `store/`, `utils/` for the whole app. This scales better
  once a second feature shows up — it gets its own folder instead of mixing into shared ones.
- **Shared primitives** (`src/components/`) are feature-agnostic: `AppButton`, `AppText`,
  `AppPressable`, `AppLoader`, `Divider`, and the theme-aware `Themed` `Text`/`View`.
- **Design tokens** (`src/tokens/`):
  - `colors.ts` — a light/dark palette with semantic tokens (`text`, `background`, `border`,
    `icon`, `status`), the last of which maps directly to transaction semantics
    (`status.success`/`status.danger` for incoming/outgoing amounts).
  - `spacing.ts` — a spacing and border-radius scale.
  - `typography.ts` — a minimal 5-variant type scale (`title`, `amount`, `button`, `body`,
    `caption`), consumed through `AppText` so no screen hardcodes a `fontSize`/`fontWeight`.
- **State**: [Zustand](https://github.com/pmndrs/zustand) (`useTransactionsStore`) holds the
  transaction list, a `status` (`idle` / `loading` / `success` / `error`), the last error
  message, and a `getByRefId` selector that the detail screen uses to look up a transaction by
  its route param — avoiding threading the full object through router params.
- **Mock API** (`src/features/transactions/api/transactions.ts`) simulates a real network call:
  a fixed delay, and a `SIMULATE_ERROR` flag you can flip to exercise the error state.

### Folder structure

```
app/                                  Expo Router routes (thin wrappers)
  index.tsx                           -> TransactionsListScreen
  transaction/[refId].tsx             -> TransactionDetailScreen
  _layout.tsx                         Root Stack navigator
src/
  components/                         Shared, feature-agnostic primitives
    AppButton.tsx / AppText.tsx / AppPressable.tsx / AppLoader.tsx / Divider.tsx
    Themed.tsx                        Theme-aware Text/View (light/dark)
    useColorScheme.ts
  constants/
    Colors.ts                         Light/dark theme derived from tokens/colors.ts
  tokens/
    colors.ts / spacing.ts / typography.ts / styles.ts
  features/
    transactions/
      api/transactions.ts             Mock API (delay + toggleable error)
      store/useTransactionsStore.ts   Zustand store
      screens/                        TransactionsListScreen, TransactionDetailScreen
      components/                     TransactionListItem, TransactionAmount,
                                       EmptyState, ErrorState
      utils/                          formatCurrency, formatDate
      types.ts                        Transaction interface
```

## Key decisions

- **Zustand over Context/Redux** — the state here (one list + a status) doesn't need Redux,
  and Zustand's store is plain functions/selectors, so the store itself is trivially
  unit-testable without rendering a component tree.
- **`getByRefId` selector instead of route params carrying the object** - Expo Router params are
  serialized strings; passing a whole transaction through them is brittle. The detail screen
  just takes `refId` and reads from the store, which also means a refresh/deep-link into the
  detail route only breaks if the id genuinely isn't in the list (handled via a "not found"
  state).
- **Native Stack header over a custom header** - Expo Router's native header already handles the
  back button, title, and safe-area insets correctly per platform; a custom header would just
  re-implement that for no visual gain here.
- **Mock API simulates delay + error** — a banking list screen is graded partly on its
  loading/empty/error handling, which is invisible if the "network" always resolves instantly
  and successfully. `SIMULATE_ERROR` in `api/transactions.ts` makes the error path demoable
  without a real backend.
- **`AppText` wraps the existing `Themed` `Text`** rather than reimplementing color resolution -
  `Themed.Text` already resolves light/dark text color via `useThemeColor`; `AppText` only adds
  the typography scale (`variant`/`weight`) on top, so there's exactly one place that resolves
  theme colors.
- **Light/dark tokens via `Colors.light`/`Colors.dark`** instead of a single flat palette — the
  app should follow the system appearance correctly.

## Testing

Unit and component tests cover the parts most likely to have real bugs — formatting edge cases,
sort order, and error handling — rather than snapshotting every screen:

- `utils/formatCurrency`, `utils/formatDate` — formatting edge cases (negative amounts, cents,
  zero, UTC date handling).
- `store/useTransactionsStore` — sorts latest-first, sets `error`/`status` correctly on a
  rejected fetch, and `getByRefId` lookup.
- `components/TransactionListItem` — renders the expected text and calls `onPress` with the
  tapped transaction (React Native Testing Library).

```bash
bun run test          # or: npx jest
npx tsc --noEmit       # typecheck
```

## Features implemented

- [x] Transaction list: transfer name, date, amount
- [x] Sorted latest-first
- [x] Positive amounts in green, negative in red
- [x] Tap a transaction -> detail screen (reference ID, date, recipient, amount)
- [x] Share the transaction details externally
- [x] Loading, empty, and error states, with a retry action
- [x] Pull-to-refresh
- [x] Accessibility labels on list rows and interactive buttons
- [x] Light/dark mode, following the system appearance
- [x] Light haptic feedback on row tap
- [x] TypeScript throughout, no `any`
- [x] Unit + component tests

## Future improvements

- Pagination / infinite scroll for a longer transaction history
- Cache the last successful fetch (e.g. with `AsyncStorage`) for an offline-friendly cold start
- Use Tanstack Query for managing server state in the app, so that it handles/invalidates caches where necessary
- Surface a refresh-time failure (e.g. a toast) instead of silently keeping stale data when a
  pull-to-refresh fails
- Replace the mock API with a real backend + auth
- E2E tests (Detox or Maestro) covering the list -> detail -> share flow
- CI: run `tsc --noEmit` and `jest` on every push/PR
