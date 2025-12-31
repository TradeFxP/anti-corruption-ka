/*
  # Investment Portfolio Database Schema

  ## Overview
  Creates a comprehensive database schema for tracking investment portfolios, holdings, and transactions.

  ## New Tables

  ### 1. `portfolios`
  - `id` (uuid, primary key) - Unique portfolio identifier
  - `user_id` (uuid) - Links to auth.users
  - `name` (text) - Portfolio name (e.g., "Retirement Account", "Growth Portfolio")
  - `description` (text, optional) - Portfolio description
  - `currency` (text) - Base currency (USD, EUR, etc.)
  - `created_at` (timestamptz) - Portfolio creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `holdings`
  - `id` (uuid, primary key) - Unique holding identifier
  - `portfolio_id` (uuid, foreign key) - Links to portfolios table
  - `symbol` (text) - Asset symbol (e.g., "AAPL", "BTC")
  - `name` (text) - Asset full name
  - `asset_type` (text) - Type: stock, bond, crypto, etf, mutual_fund, cash
  - `quantity` (numeric) - Current quantity held
  - `average_cost` (numeric) - Average cost per unit
  - `current_price` (numeric) - Current market price
  - `sector` (text, optional) - Sector classification
  - `created_at` (timestamptz) - Holding creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `transactions`
  - `id` (uuid, primary key) - Unique transaction identifier
  - `portfolio_id` (uuid, foreign key) - Links to portfolios table
  - `holding_id` (uuid, foreign key, optional) - Links to holdings table
  - `transaction_type` (text) - Type: buy, sell, dividend, deposit, withdrawal
  - `symbol` (text) - Asset symbol
  - `quantity` (numeric) - Transaction quantity
  - `price` (numeric) - Price per unit
  - `total_amount` (numeric) - Total transaction value
  - `fees` (numeric) - Transaction fees
  - `notes` (text, optional) - Transaction notes
  - `transaction_date` (timestamptz) - Transaction date
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only access their own portfolio data
  - Policies restrict all operations to authenticated users
  - SELECT, INSERT, UPDATE, DELETE policies verify user ownership
*/

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  currency text DEFAULT 'USD' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create holdings table
CREATE TABLE IF NOT EXISTS holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  name text NOT NULL,
  asset_type text NOT NULL CHECK (asset_type IN ('stock', 'bond', 'crypto', 'etf', 'mutual_fund', 'cash')),
  quantity numeric NOT NULL DEFAULT 0,
  average_cost numeric NOT NULL DEFAULT 0,
  current_price numeric NOT NULL DEFAULT 0,
  sector text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
  holding_id uuid REFERENCES holdings(id) ON DELETE SET NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('buy', 'sell', 'dividend', 'deposit', 'withdrawal')),
  symbol text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  price numeric NOT NULL DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  fees numeric DEFAULT 0 NOT NULL,
  notes text,
  transaction_date timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_holdings_portfolio_id ON holdings(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_holdings_symbol ON holdings(symbol);
CREATE INDEX IF NOT EXISTS idx_transactions_portfolio_id ON transactions(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_transactions_holding_id ON transactions(holding_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Portfolios policies
CREATE POLICY "Users can view own portfolios"
  ON portfolios FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own portfolios"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios"
  ON portfolios FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Holdings policies
CREATE POLICY "Users can view own holdings"
  ON holdings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create holdings in own portfolios"
  ON holdings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update holdings in own portfolios"
  ON holdings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete holdings in own portfolios"
  ON holdings FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

-- Transactions policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create transactions in own portfolios"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update transactions in own portfolios"
  ON transactions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete transactions in own portfolios"
  ON transactions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_holdings_updated_at
  BEFORE UPDATE ON holdings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
