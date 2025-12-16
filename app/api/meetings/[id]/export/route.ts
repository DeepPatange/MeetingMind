import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Document, Packer, Paragraph, TextRun } from 'docx'

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params

  // Handle CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Or specific origin
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    const meeting = await prisma.meeting.findUnique({
      where: { id },
      include: {
        tasks: true,
        decisions: true,
        questions: true,
        insights: true,
        deadlines: true,
        attendees: true,
        followUps: true,
        risks: true,
        agenda: true,
      },
    })

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found.' }, { status: 404 })
    }

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: meeting.name,
              heading: 'Heading1',
            }),
            new Paragraph({
              text: 'Description',
              heading: 'Heading2',
            }),
            new Paragraph(meeting.description),
            new Paragraph({
              text: 'Summary',
              heading: 'Heading2',
            }),
            new Paragraph(meeting.summary),
            new Paragraph({
              text: 'Transcript',
              heading: 'Heading2',
            }),
            new Paragraph(meeting.rawTranscript),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Tasks', meeting.tasks.map((task: any) => `**Task:** ${task.task}\n**Owner:** ${task.owner}\n**Due Date:** ${task.dueDate}`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Decisions', meeting.decisions.map((decision: any) => `**Decision:** ${decision.decision}\n**Date:** ${decision.date}`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Questions', meeting.questions.map((question: any) => `**Question:** ${question.question}\n**Status:** ${question.status}\n**Answer:** ${question.answer || 'N/A'}`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Insights', meeting.insights.map((insight: any) => `${insight.insight} (Reference: ${insight.reference})`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Deadlines', meeting.deadlines.map((deadline: any) => `**Description:** ${deadline.description}\n**Due Date:** ${deadline.dueDate}`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Attendees', meeting.attendees.map((attendee: any) => `${attendee.name} (${attendee.role})`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Follow-ups', meeting.followUps.map((followUp: any) => `**Follow-up:** ${followUp.description}\n**Owner:** ${followUp.owner}`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Risks', meeting.risks.map((risk: any) => `**Risk:** ${risk.risk}\n**Impact:** ${risk.impact}`)),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...formatSection('Agenda', meeting.agenda.map((item: any) => `${item.item}`)),
          ],
        },
      ],
    })

    const buffer = await Packer.toBuffer(doc)
    const fileName = `${meeting.name.replace(/\s+/g, '_')}_Details.docx`

    return new NextResponse(buffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to export meeting details.' }, { status: 500 })
  }
}

const formatSection = (title: string, items: string[]) => {
  const paragraphs = [
    new Paragraph({
      text: title,
      heading: 'Heading2',
      spacing: { before: 300, after: 200 },
    }),
  ]

  items.forEach(item => {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: item,
            break: 1,
          }),
        ],
        spacing: { after: 100 },
      })
    )
  })

  return paragraphs
}
