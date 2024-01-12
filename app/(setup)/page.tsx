

import InitialModal from '@/components/modals/initial-modal';
import { ModeToggle } from '@/components/mode-toggle';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const SetupPage = async (props: Props) => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <InitialModal />
  )
}

export default SetupPage