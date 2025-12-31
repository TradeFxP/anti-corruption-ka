/*
  # Consolidate Multiple Permissive Policies

  ## Overview
  This migration consolidates tables that have multiple permissive policies for the same action.
  Multiple permissive policies can cause confusion and make security model harder to maintain.

  ## Changes Made

  ### Tables Updated
  1. `broker_details` - Consolidate INSERT, SELECT, and UPDATE policies
  2. `broker_permissions` - Consolidate INSERT, SELECT, and UPDATE policies
  3. `broker_subscriptions_updated` - Consolidate INSERT, SELECT, and UPDATE policies
  4. `broker_users` - Consolidate SELECT policies
  5. `brokers` - Consolidate UPDATE policies
  6. `directors` - Consolidate INSERT, SELECT, and UPDATE policies
  7. `pending_payments` - Consolidate INSERT, SELECT, and UPDATE policies
  8. `user_roles` - Consolidate SELECT policies

  ## Security Notes
  - All access patterns are preserved
  - Policies use OR logic to combine previous access rules
  - Performance optimizations applied (using select wrapper for auth functions)
*/

-- ============================================================================
-- broker_details - Consolidate Policies
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can insert broker details" ON broker_details;
DROP POLICY IF EXISTS "Authenticated users can create broker details" ON broker_details;
DROP POLICY IF EXISTS "Admins can view all broker details" ON broker_details;
DROP POLICY IF EXISTS "Brokers can view own details" ON broker_details;
DROP POLICY IF EXISTS "Admins can update broker details" ON broker_details;
DROP POLICY IF EXISTS "Brokers can update own details" ON broker_details;

-- Create consolidated policies
CREATE POLICY "Manage broker details insert"
  ON broker_details FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_details.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Manage broker details select"
  ON broker_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_details.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Manage broker details update"
  ON broker_details FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_details.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_details.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  );

-- ============================================================================
-- broker_permissions - Consolidate Policies
-- ============================================================================

DROP POLICY IF EXISTS "Admins can insert broker permissions" ON broker_permissions;
DROP POLICY IF EXISTS "Users can insert broker permissions" ON broker_permissions;
DROP POLICY IF EXISTS "Admins can view all broker permissions" ON broker_permissions;
DROP POLICY IF EXISTS "Users can view broker permissions" ON broker_permissions;
DROP POLICY IF EXISTS "Admins can update broker permissions" ON broker_permissions;
DROP POLICY IF EXISTS "Users can update broker permissions" ON broker_permissions;

CREATE POLICY "Manage broker permissions insert"
  ON broker_permissions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_permissions.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  );

CREATE POLICY "Manage broker permissions select"
  ON broker_permissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_permissions.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Manage broker permissions update"
  ON broker_permissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_permissions.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_permissions.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  );

-- ============================================================================
-- broker_subscriptions_updated - Consolidate Policies
-- ============================================================================

DROP POLICY IF EXISTS "Admins can insert subscriptions" ON broker_subscriptions_updated;
DROP POLICY IF EXISTS "Users can create subscriptions" ON broker_subscriptions_updated;
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON broker_subscriptions_updated;
DROP POLICY IF EXISTS "Users can view subscriptions" ON broker_subscriptions_updated;
DROP POLICY IF EXISTS "Admins can update subscriptions" ON broker_subscriptions_updated;
DROP POLICY IF EXISTS "Users can update subscriptions" ON broker_subscriptions_updated;

CREATE POLICY "Manage subscriptions insert"
  ON broker_subscriptions_updated FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_subscriptions_updated.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role IN ('owner', 'manager')
    )
  );

CREATE POLICY "Manage subscriptions select"
  ON broker_subscriptions_updated FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_subscriptions_updated.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Manage subscriptions update"
  ON broker_subscriptions_updated FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_subscriptions_updated.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role IN ('owner', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = broker_subscriptions_updated.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role IN ('owner', 'manager')
    )
  );

-- ============================================================================
-- broker_users - Consolidate Policies
-- ============================================================================

DROP POLICY IF EXISTS "Admins can view all broker users" ON broker_users;
DROP POLICY IF EXISTS "Brokers can view own profile" ON broker_users;

CREATE POLICY "Manage broker users select"
  ON broker_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    broker_users.user_id = (select auth.uid())
    OR
    EXISTS (
      SELECT 1 FROM broker_users bu
      WHERE bu.broker_id = broker_users.broker_id
      AND bu.user_id = (select auth.uid())
      AND bu.role IN ('owner', 'manager')
    )
  );

-- ============================================================================
-- brokers - Consolidate Policies
-- ============================================================================

DROP POLICY IF EXISTS "Admins can update brokers" ON brokers;
DROP POLICY IF EXISTS "Brokers can update own broker record" ON brokers;

CREATE POLICY "Manage brokers update"
  ON brokers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = brokers.id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = brokers.id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  );

-- ============================================================================
-- directors - Consolidate Policies
-- ============================================================================

DROP POLICY IF EXISTS "Admins can insert directors" ON directors;
DROP POLICY IF EXISTS "Users can insert directors" ON directors;
DROP POLICY IF EXISTS "Admins can view all directors" ON directors;
DROP POLICY IF EXISTS "Users can view directors" ON directors;
DROP POLICY IF EXISTS "Admins can update directors" ON directors;
DROP POLICY IF EXISTS "Users can update directors" ON directors;

CREATE POLICY "Manage directors insert"
  ON directors FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = directors.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  );

CREATE POLICY "Manage directors select"
  ON directors FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = directors.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Manage directors update"
  ON directors FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = directors.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = directors.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role = 'owner'
    )
  );

-- ============================================================================
-- pending_payments - Consolidate Policies
-- ============================================================================

DROP POLICY IF EXISTS "Admins can insert payments" ON pending_payments;
DROP POLICY IF EXISTS "Authenticated users can insert pending payments" ON pending_payments;
DROP POLICY IF EXISTS "Admins can view all payments" ON pending_payments;
DROP POLICY IF EXISTS "Users can view payments" ON pending_payments;
DROP POLICY IF EXISTS "Admins can update payments" ON pending_payments;
DROP POLICY IF EXISTS "Authenticated users can update pending payments" ON pending_payments;

CREATE POLICY "Manage payments insert"
  ON pending_payments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = pending_payments.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role IN ('owner', 'manager')
    )
  );

CREATE POLICY "Manage payments select"
  ON pending_payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = pending_payments.broker_id
      AND broker_users.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Manage payments update"
  ON pending_payments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = pending_payments.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role IN ('owner', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (select auth.uid())
      AND user_roles.role = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM broker_users
      WHERE broker_users.broker_id = pending_payments.broker_id
      AND broker_users.user_id = (select auth.uid())
      AND broker_users.role IN ('owner', 'manager')
    )
  );

-- ============================================================================
-- user_roles - Consolidate Policies
-- ============================================================================

DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view own role" ON user_roles;

CREATE POLICY "Manage user roles select"
  ON user_roles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = (select auth.uid())
      AND ur.role = 'admin'
    )
    OR
    user_roles.user_id = (select auth.uid())
  );