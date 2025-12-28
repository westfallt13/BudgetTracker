# Budget Tracker - Multi-Account Expense Manager

A modern, feature-rich expense tracking application built with React.js. Track your finances across multiple bank accounts, manage transactions, and monitor your spending habits all in one place.

## Features

### 🏦 Multi-Account Management
- Create and manage multiple bank accounts (Checking, Savings, Credit Card, Cash, Investment)
- Track initial balances and real-time calculated balances
- View account details and transaction counts
- Edit or delete accounts with ease

### 💳 Transaction Tracking
- Add income and expense transactions
- Categorize transactions (Food, Transportation, Shopping, Entertainment, Bills, etc.)
- Add detailed descriptions and notes to transactions
- Date tracking for all transactions
- Edit or delete transactions
- Filter transactions by account, type, or category

### 📊 Dashboard Overview
- View total balance across all accounts
- Track total income and total expenses
- See recent transactions at a glance
- Visual account balance cards
- Real-time statistics

### 💾 Data Persistence
- All data stored in browser's localStorage
- Data persists across browser sessions
- No server or database required

### 🎨 Modern UI/UX
- Clean, intuitive interface
- Responsive design works on desktop, tablet, and mobile
- Smooth animations and transitions
- Color-coded transaction types (income vs expense)
- Modal-based forms for better user experience

## Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Webpack 5
- **JavaScript Compiler:** Babel
- **Styling:** Pure CSS with modern features
- **State Management:** React Context API
- **Data Storage:** Browser localStorage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone or navigate to the project directory:
```bash
cd "d:\Custom Builds\BudgetTracker"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

### Build for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## Project Structure

```
BudgetTracker/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Dashboard.js        # Dashboard overview component
│   │   ├── AccountList.js      # Account management component
│   │   └── TransactionList.js  # Transaction management component
│   ├── context/
│   │   └── BudgetContext.js    # Global state management
│   ├── App.js                  # Main app component with navigation
│   ├── index.js                # App entry point
│   └── styles.css              # Global styles
├── .babelrc                    # Babel configuration
├── webpack.config.js           # Webpack configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Usage Guide

### Creating an Account

1. Navigate to the "Accounts" tab
2. Click "Add Account"
3. Fill in the account details:
   - Name (e.g., "Chase Checking")
   - Type (Checking, Savings, Credit Card, etc.)
   - Initial Balance
   - Description (optional)
4. Click "Create Account"

### Adding Transactions

1. Navigate to the "Transactions" tab
2. Click "Add Transaction"
3. Select the account
4. Choose transaction type (Income or Expense)
5. Enter the amount
6. Add a description
7. Select a category (optional)
8. Set the date
9. Add notes (optional)
10. Click "Add Transaction"

### Viewing Dashboard

The Dashboard provides:
- Total balance across all accounts
- Total income and expenses
- Individual account balances
- Recent transaction history

### Filtering Transactions

Use the filter dropdowns to:
- View transactions from a specific account
- Filter by income or expense
- Filter by category

## Future Enhancements (Ready for Electron)

This application is designed to be wrapped in Electron for a desktop experience. When ready to convert to Electron:

1. The app uses only browser-based APIs (no server dependencies)
2. All data is stored in localStorage (will work in Electron)
3. The UI is optimized for desktop viewing
4. No external API calls or dependencies

Potential Electron features to add:
- Export data to CSV/PDF
- Import transactions from bank statements
- Local file system data backup
- Native notifications for bill reminders
- System tray integration

## Browser Compatibility

- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

## Data Privacy

- All data is stored locally in your browser
- No data is sent to any external servers
- No analytics or tracking
- Complete privacy and control over your financial data

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues or questions, please check the code comments or create an issue in your repository.

---

**Note:** This is a client-side application. All data is stored in browser localStorage. Clearing browser data will delete all your accounts and transactions. Consider implementing a backup/export feature before clearing browser data.
