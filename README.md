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

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Desktop Application

Run as a desktop application with Electron:

```bash
# Build and run
npm run electron-dev

# Or run without rebuilding (after npm run build)
npm run electron
```

### Build for Production

Create production-ready files:

```bash
npm run build
```

### Package for Windows

Create a standalone Windows executable:

```bash
npm run package-win
```

The packaged application will be in `release/BudgetTracker-win32-x64/BudgetTracker.exe`

## 📖 How to Use

### 1. Create Your First Account

1. Navigate to the **Accounts** tab
2. Click "Add Account"
3. Fill in:
   - Account Name (e.g., "Chase Checking")
   - Account Type (Checking, Savings, etc.)
   - Initial Balance
   - Description (optional)
4. Click "Create Account"

### 2. Add Transactions

1. Go to the **Transactions** tab
2. Click "Add Transaction"
3. Select:
   - Account
   - Type (Income/Expense)
   - Amount
   - Description
   - Category (optional)
   - Date
   - Notes (optional)
4. Click "Add Transaction"

### 3. Monitor Your Finances

- View the **Dashboard** for overview statistics
- Filter transactions by account, type, or category
- Edit or delete accounts and transactions as needed
- All data is automatically saved

## 🔧 Development

### Project Structure

```
BudgetTracker/
├── Icons/                  # SVG icon files
├── public/                 # Public assets
│   └── index.html
├── src/
│   ├── components/         # React components
│   │   ├── AccountList.js
│   │   ├── Dashboard.js
│   │   ├── Icon.js
│   │   └── TransactionList.js
│   ├── context/
│   │   └── BudgetContext.js  # State management
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── styles.css          # Global styles
├── main.js                 # Electron main process
├── webpack.config.js       # Build configuration
└── package.json
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run electron` | Run Electron app |
| `npm run electron-dev` | Build and run Electron |
| `npm run package-win` | Package Windows app |

### Adding New Features

1. **New Icons**: Add SVG to `Icons/` folder and update `Icon.js`
2. **New Components**: Create in `src/components/` and import in `App.js`
3. **State Management**: Extend `BudgetContext.js` for global state
4. **Styling**: Update `src/styles.css` with new styles

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, etc.)

## 💡 Feature Requests

Have an idea? Open an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Desktop support via [Electron](https://www.electronjs.org/)
- Icons are custom SVG designs
- Inspired by the need for simple, private expense tracking

## 📧 Contact

For questions or suggestions:
- Open an issue on GitHub
- Submit a pull request

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Export data to CSV/Excel
- [ ] Import transactions from bank statements
- [ ] Recurring transactions
- [ ] Budget limits and alerts
- [ ] Charts and analytics
- [ ] Multi-currency support
- [ ] Cloud backup (optional)
- [ ] Mobile app version
- [ ] Dark mode theme

## 🔒 Privacy

Your data stays on your device:
- No external servers
- No data collection
- No analytics or tracking
- Complete privacy

## ⚠️ Disclaimer

This application is for personal finance tracking only. Always maintain separate backup records of your financial data. The developers are not responsible for any data loss or financial decisions made based on this application.

---

<div align="center">

Made with ❤️ for financial freedom

**[⬆ back to top](#budget-tracker---multi-account-expense-manager)**

</div>
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
