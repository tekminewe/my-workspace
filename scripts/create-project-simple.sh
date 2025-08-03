#!/bin/bash

# Simplified GitHub Project Board Setup
# Uses most stable gh CLI commands for maximum compatibility

set -e

echo "🚀 Creating Acquisition Strategy Project Board..."

# Check authentication
if ! gh auth status > /dev/null 2>&1; then
    echo "❌ Please authenticate first: gh auth login"
    exit 1
fi

# Repository and project details
REPO="tekminewe/my-workspace"
PROJECT_TITLE="Acquisition Strategy & Feature Development"

echo "Creating project..."

# Create project using the stable command format
gh project create \
    --title "$PROJECT_TITLE" \
    --body "Social media integration, user acquisition features, and product development tracking" \
    --owner tekminewe

echo "✅ Project created successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Visit: https://github.com/tekminewe/my-workspace/projects"
echo "2. Find your new project: '$PROJECT_TITLE'"
echo "3. Add these existing issues to the project:"
echo "   • Issue #2: Welcome Bonus System"
echo "   • Issue #3: Social Login Integration"
echo "   • Issue #4: Basic Referral Program"
echo "   • Issue #5: Deal Sharing Templates"
echo "   • Issue #6: Email Notification System"
echo "   • Issue #7: Instagram/Facebook Shopping"
echo "   • Issue #8: Viral Content Templates"
echo "   • Issue #9: Enhanced Authentication"
echo "   • Issue #10: Phase 1 Milestone"
echo "   • Issue #11: Analytics Infrastructure"
echo ""
echo "🚀 Your acquisition strategy project is ready!"
