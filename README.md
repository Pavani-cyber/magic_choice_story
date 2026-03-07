Magic Choice Story is a full-stack educational web application that provides children with interactive stories, downloadable worksheets, quizzes, and certificates to make learning fun and engaging.

The project follows MVC architecture and is built using HTML, CSS, JavaScript (frontend) with Node.js, Express.js, MongoDB Atlas, and Cloudinary (backend & storage).

🚀** Features
👦 For Kids**

📖 Read animated & colorful stories

📝 Download worksheets (PDF)

❓ Attempt quizzes for each story

🏆 Auto certificate generation after completion

💧 Simple and kid-friendly UI

👨‍💻 **System Features**

Worksheet uploads

Quiz system with scoring

Certificate auto-generation (PDF)

Cloud image & file storage

Fully responsive design

🏗️** Tech Stack**
**Frontend **

HTML5

CSS3

JavaScript (Vanilla JS)

**Backend**

Node.js

Express.js

**Database**

MongoDB Atlas (Cloud)

File & Image Storage

Cloudinary

**Other Tools**

Mongoose ODM

PDF generation libraries

dotenv

Express sessions / JWT (authentication)

---

## Premium access (worksheet/quiz/certificate)

Each story card on the worksheets page now shows a **₹29** price tag. Users must be logged in before they can initiate premium purchase; a login link is provided in the top bar and the application will redirect to `/login.html` if you attempt to open a worksheet/quiz without an account. Once authenticated, clicking either the **Worksheet** or **Take Quiz** buttons will prompt the user to purchase premium if they haven’t already paid. After payment the worksheet and quiz open normally and the card is marked as _Unlocked_.

A modal window explains the features and provides a Razorpay/UPI payment QR code and UPI ID.

Access is only granted after the server verifies a successful Razorpay payment; the client no longer stores purchase status locally.

> Replace the placeholder UPI ID and QR image in `public/worksheets.html` with your own values from Razorpay. You can also set the `UPI_ID` constant at the top of `public/js/worksheets.app.js` for convenience. For example:
>
> ```js
> const UPI_ID = "pagadalapavani7@oksbi";
> ```
>
> ### User authentication & authorization

A full user system has been added to secure premium access and tie purchases to
accounts. Passwords are salted and hashed using bcrypt before storage; login
creates a JWT which the client stores in `localStorage` and sends on protected
requests.

Key pieces:

- `models/user.js` – schema with email and password. Pre-save middleware salts
  & hashes the password (`bcrypt.genSalt(10)` + `bcrypt.hash`). A helper method
  `comparePassword()` checks credentials.
- `controllers/authController.js` – `register`, `login`, and `getProfile` actions.
  Register validates uniqueness, hashes via the schema hook, and returns a token.
  Login verifies the password and returns a token. `getProfile` returns basic
  info for the authenticated user.
- `routes/authRoutes.js` – exposes `/api/auth/register`, `/api/auth/login` and
  `/api/auth/profile` (the latter requires authentication).
- `middleware/authMiddleware.js` – verifies Bearer JWT (`jsonwebtoken`) and
  attaches `req.user`. Tokens expire after 7 days.
- `app.js` – registers `authRoutes` and warns if `JWT_SECRET` isn’t set.
- `.env.example` updated with `JWT_SECRET` entry (copy its contents into your own `.env`).
- `public/login.html` – simple login/register form that stores the returned JWT
  in `localStorage`. After successful authentication, users are redirected to
  `worksheets.html`.

Client-side changes in `public/js/worksheets.app.js`:

1. Helpers for token management (`getToken`, `setToken`, `withAuth`) and
   `ensureLoggedIn()` which redirects to `/login.html` if no token is present.
2. Worksheet/quiz button handlers now call `ensureLoggedIn()` before showing the
   premium modal.
3. Fetch calls to `/api/premium/order` and `/api/premium/verify` include the
   Authorization header when a token is present.

You should run `npm install bcrypt jsonwebtoken` to add the required packages for authentication (alongside the previously installed `razorpay` etc).

The login/register HTML page is available at `/login.html`. Users must
authenticate before initiating premium purchase or accessing worksheets/quizzes.

**Configuration:**

- Create a file named `.env` in the project root and set your secrets there
  (Mongo URI, Razorpay keys, JWT_SECRET, etc). The application loads this file
  automatically via `dotenv`.
- The `.env.example` file used to exist for guidance but is not required; you can
  simply replicate its contents into `.env` and fill in your own values.

### Optional: Razorpay API integration (server-side tracking)

> The UI currently uses manual confirmation. To automate and record payments:
>
> 1. **Install the SDK:**
>
>    ```bash
>    npm install razorpay
>    ```
>
> 2. **Set environment variables** (e.g. in a `.env` file):
>
>    ```env
>    RAZORPAY_KEY_ID=rzp_test_xxx
>    RAZORPAY_KEY_SECRET=your_secret_key
>    ```
>
> 3. **Backend support** is included in this repo:
>    - `models/purchase.js` – stores order/payment records.
>    - `controllers/paymentController.js` – has `createOrder`, `verifyPayment`,
>      and `getPurchases` functions.
>    - `routes/paymentRoutes.js` – mounted at `/api/premium` in `app.js`.
> 4. **Create order**: client POSTs `{ storyId }` to `/api/premium/order`; server
>    calls Razorpay to make an order and returns the order object plus a local
>    purchase ID.
> 5. **Checkout**: front-end invokes Razorpay checkout with the returned `order_id` (and use the `key_id` value returned by the server to initialise the Razorpay script).
> 6. **Verify**: after payment Razorpay returns `payment_id`, `order_id` and
>    `signature`; client POSTs these plus the local `purchaseId` to
>    `/api/premium/verify`. Server verifies signature using your key secret and
>    marks the purchase as paid/failed.
> 7. **Unlocking**: once the server confirms a successful payment the client
>    re‑renders the grid and the unlocked status is displayed; optionally fetch
>    purchase history from `/api/premium/history` (requires auth).
> 8. **Authentication**: purchases are linked to a user if you add a `User` model
>    and supply `req.user` (via session or JWT). Otherwise the order is anonymous.
>
> See the source files mentioned above for the exact implementation details.
