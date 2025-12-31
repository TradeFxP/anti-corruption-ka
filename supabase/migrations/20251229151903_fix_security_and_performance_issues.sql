/*
  # Fix Database Security and Performance Issues

  ## Overview
  Addresses critical security and performance issues identified by Supabase database advisor.

  ## Changes Made

  ### 1. Add Missing Indexes for Foreign Keys
  Creates indexes on foreign key columns to improve query performance:
  - `pending_payments.subscription_id`
  - `subscription_change_history` foreign keys (6 columns)
  - `support_messages.sender_id`
  - `support_tickets.assigned_to`

  ### 2. Optimize RLS Policies
  Updates RLS policies to use `(select auth.uid())` pattern instead of `auth.uid()`:
  - Prevents re-evaluation of auth function for each row
  - Significantly improves query performance at scale
  - Affects policies on: portfolios, holdings, transactions, brokers tables

  ### 3. Fix Function Search Path
  Updates `update_updated_at_column` function with stable search_path to prevent security issues.

  ## Security Notes
  - All changes maintain existing security rules
  - RLS policies remain restrictive and secure
  - Performance improvements do not compromise data safety
*/

-- =====================================================
-- 1. ADD MISSING INDEXES FOR FOREIGN KEYS
-- =====================================================

-- Index for pending_payments.subscription_id
CREATE INDEX IF NOT EXISTS idx_pending_payments_subscription_id 
  ON pending_payments(subscription_id);

-- Indexes for subscription_change_history foreign keys
CREATE INDEX IF NOT EXISTS idx_subscription_change_history_changed_by 
  ON subscription_change_history(changed_by);

CREATE INDEX IF NOT EXISTS idx_subscription_change_history_new_subscription_id 
  ON subscription_change_history(new_subscription_id);

CREATE INDEX IF NOT EXISTS idx_subscription_change_history_new_subscription_type_id 
  ON subscription_change_history(new_subscription_type_id);

CREATE INDEX IF NOT EXISTS idx_subscription_change_history_old_subscription_id 
  ON subscription_change_history(old_subscription_id);

CREATE INDEX IF NOT EXISTS idx_subscription_change_history_old_subscription_type_id 
  ON subscription_change_history(old_subscription_type_id);

-- Index for support_messages.sender_id
CREATE INDEX IF NOT EXISTS idx_support_messages_sender_id 
  ON support_messages(sender_id);

-- Index for support_tickets.assigned_to
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to 
  ON support_tickets(assigned_to);

-- =====================================================
-- 2. OPTIMIZE RLS POLICIES
-- =====================================================

-- Drop and recreate portfolios policies with optimized auth check
DROP POLICY IF EXISTS "Users can view own portfolios" ON portfolios;
CREATE POLICY "Users can view own portfolios"
  ON portfolios FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create own portfolios" ON portfolios;
CREATE POLICY "Users can create own portfolios"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own portfolios" ON portfolios;
CREATE POLICY "Users can update own portfolios"
  ON portfolios FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own portfolios" ON portfolios;
CREATE POLICY "Users can delete own portfolios"
  ON portfolios FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Drop and recreate holdings policies with optimized auth check
DROP POLICY IF EXISTS "Users can view own holdings" ON holdings;
CREATE POLICY "Users can view own holdings"
  ON holdings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can create holdings in own portfolios" ON holdings;
CREATE POLICY "Users can create holdings in own portfolios"
  ON holdings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can update holdings in own portfolios" ON holdings;
CREATE POLICY "Users can update holdings in own portfolios"
  ON holdings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can delete holdings in own portfolios" ON holdings;
CREATE POLICY "Users can delete holdings in own portfolios"
  ON holdings FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = holdings.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

-- Drop and recreate transactions policies with optimized auth check
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can create transactions in own portfolios" ON transactions;
CREATE POLICY "Users can create transactions in own portfolios"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can update transactions in own portfolios" ON transactions;
CREATE POLICY "Users can update transactions in own portfolios"
  ON transactions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can delete transactions in own portfolios" ON transactions;
CREATE POLICY "Users can delete transactions in own portfolios"
  ON transactions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = (select auth.uid())
    )
  );

-- Optimize brokers view policy
DROP POLICY IF EXISTS "Users can view brokers" ON brokers;
CREATE POLICY "Users can view brokers"
  ON brokers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = brokers.id
      AND broker_users.user_id = (select auth.uid())
    )
    OR
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
  );

-- =====================================================
-- 3. FIX FUNCTION SEARCH PATH
-- =====================================================

-- Recreate function with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;