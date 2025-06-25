import { getUser } from '@/queries/user'
import { User } from '@/types/user'
import { currentUser } from '@clerk/nextjs/server'

export async function getCurrentUser(): Promise<User | null> {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const userData = await getUser({ id: clerkUser.id })
  if (!userData) return null

  return {
    id: userData.id,
    username: userData.username,
    name: clerkUser.fullName || (clerkUser.firstName + ' ' + clerkUser.lastName).trim(),
    joinedDate: new Date(clerkUser.createdAt),
    bio: userData.bio,
    location: userData.location,
    website: userData.website,
    followersCount: userData.followersCount,
    followingCount: userData.followingCount,
    postsCount: userData.postsCount,
    imageUrl: userData.imageUrl,
  }
}

// {
//     id: 'user_2yxFH6RAlieGUg1sRCV0YtuYSxY',
//     passwordEnabled: true,
//     totpEnabled: false,
//     backupCodeEnabled: false,
//     twoFactorEnabled: false,
//     banned: false,
//     locked: false,
//     createdAt: 1750768226480,
//     updatedAt: 1750768226526,
//     imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yeXNBM3RTekU1d1dha0JtZk05bFA4dngwT3ciLCJyaWQiOiJ1c2VyXzJ5eEZINlJBbGllR1VnMXNSQ1YwWXR1WVN4WSIsImluaXRpYWxzIjoiQU0ifQ',
//     hasImage: false,
//     primaryEmailAddressId: 'idn_2yxFH3iFib8uWxz4iVIIxXIIbz7',
//     primaryPhoneNumberId: null,
//     primaryWeb3WalletId: null,
//     lastSignInAt: 1750768226507,
//     externalId: null,
//     username: 'amir',
//     firstName: 'Amir',
//     lastName: 'Mohamed',
//     publicMetadata: {},
//     privateMetadata: {},
//     unsafeMetadata: {},
//     emailAddresses: [
//       _EmailAddress {
//         id: 'idn_2yxFH3iFib8uWxz4iVIIxXIIbz7',
//         emailAddress: 'amir@gmail.com',
//         verification: null,
//         linkedTo: []
//       }
//     ],
//     phoneNumbers: [],
//     web3Wallets: [],
//     externalAccounts: [],
//     samlAccounts: [],
//     lastActiveAt: 1750768226479,
//     createOrganizationEnabled: true,
//     createOrganizationsLimit: null,
//     deleteSelfEnabled: true,
//     legalAcceptedAt: null,
//     _raw: {
//       id: 'user_2yxFH6RAlieGUg1sRCV0YtuYSxY',
//       object: 'user',
//       username: 'amir',
//       first_name: 'Amir',
//       last_name: 'Mohamed',
//       image_url: 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yeXNBM3RTekU1d1dha0JtZk05bFA4dngwT3ciLCJyaWQiOiJ1c2VyXzJ5eEZINlJBbGllR1VnMXNSQ1YwWXR1WVN4WSIsImluaXRpYWxzIjoiQU0ifQ',
//       has_image: false,
//       primary_email_address_id: 'idn_2yxFH3iFib8uWxz4iVIIxXIIbz7',
//       primary_phone_number_id: null,
//       primary_web3_wallet_id: null,
//       password_enabled: true,
//       two_factor_enabled: false,
//       totp_enabled: false,
//       backup_code_enabled: false,
//       email_addresses: [ [Object] ],
//       phone_numbers: [],
//       web3_wallets: [],
//       passkeys: [],
//       external_accounts: [],
//       saml_accounts: [],
//       enterprise_accounts: [],
//       public_metadata: {},
//       private_metadata: {},
//       unsafe_metadata: {},
//       external_id: null,
//       last_sign_in_at: 1750768226507,
//       banned: false,
//       locked: false,
//       lockout_expires_in_seconds: null,
//       verification_attempts_remaining: 100,
//       created_at: 1750768226480,
//       updated_at: 1750768226526,
//       delete_self_enabled: true,
//       create_organization_enabled: true,
//       last_active_at: 1750768226479,
//       mfa_enabled_at: null,
//       mfa_disabled_at: null,
//       legal_accepted_at: null,
//       profile_image_url: 'https://www.gravatar.com/avatar?d=mp'
//     }
//   }
