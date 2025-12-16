import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params

  try {
    const meeting = await prisma.meeting.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        rawTranscript: true,
        summary: true,
        createdAt: true,
        updatedAt: true,
        tasks: {
          select: {
            id: true,
            task: true,
            owner: true,
            dueDate: true,
          },
        },
        decisions: {
          select: {
            id: true,
            decision: true,
            date: true,
          },
        },
        questions: {
          select: {
            id: true,
            question: true,
            status: true,
            answer: true,
          },
        },
        insights: {
          select: {
            id: true,
            insight: true,
            reference: true,
          },
        },
        deadlines: {
          select: {
            id: true,
            description: true,
            dueDate: true,
          },
        },
        attendees: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        followUps: {
          select: {
            id: true,
            description: true,
            owner: true,
          },
        },
        risks: {
          select: {
            id: true,
            risk: true,
            impact: true,
          },
        },
        agenda: {
          select: {
            id: true,
            item: true,
          },
        },
      },
    })

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found.' }, { status: 404 })
    }

    const formattedMeeting = {
      name: meeting.name,
      description: meeting.description,
      transcript: meeting.rawTranscript,
      summary: meeting.summary,
      breakdown: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Tasks: meeting.tasks.map((task: any) => ({ task: task.task, owner: task.owner, due_date: task.dueDate })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Decisions: meeting.decisions.map((decision: any) => ({ decision: decision.decision, date: decision.date })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Questions: meeting.questions.map((question: any) => ({ question: question.question, status: question.status, answer: question.answer })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Insights: meeting.insights.map((insight: any) => ({ insight: insight.insight, reference: insight.reference })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Deadlines: meeting.deadlines.map((deadline: any) => ({ description: deadline.description, due_date: deadline.dueDate })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Attendees: meeting.attendees.map((attendee: any) => ({ name: attendee.name, role: attendee.role })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "Follow-ups": meeting.followUps.map((followUp: any) => ({ description: followUp.description, owner: followUp.owner })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Risks: meeting.risks.map((risk: any) => ({ risk: risk.risk, impact: risk.impact })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Agenda: meeting.agenda.map((item: any) => ({ item: item.item })),
      },
    }
    console.log(formattedMeeting)
    return NextResponse.json(formattedMeeting, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch meeting details.' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    // Delete all associated records
    await prisma.$transaction([
      prisma.task.deleteMany({ where: { meetingId: id } }),
      prisma.decision.deleteMany({ where: { meetingId: id } }),
      prisma.question.deleteMany({ where: { meetingId: id } }),
      prisma.insight.deleteMany({ where: { meetingId: id } }),
      prisma.deadline.deleteMany({ where: { meetingId: id } }),
      prisma.attendee.deleteMany({ where: { meetingId: id } }),
      prisma.followUp.deleteMany({ where: { meetingId: id } }),
      prisma.risk.deleteMany({ where: { meetingId: id } }),
      prisma.agendaItem.deleteMany({ where: { meetingId: id } }),
      prisma.meeting.delete({ where: { id } }),
    ])

    return NextResponse.json({ message: 'Meeting deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting meeting:', error)
    return NextResponse.json({ error: 'Failed to delete meeting' }, { status: 500 })
  }
}
