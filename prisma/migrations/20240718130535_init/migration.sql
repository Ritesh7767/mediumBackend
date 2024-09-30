-- AddForeignKey
ALTER TABLE "FollowRequest" ADD CONSTRAINT "FollowRequest_requestedId_fkey" FOREIGN KEY ("requestedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
