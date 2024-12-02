import { faker } from "@faker-js/faker";
import { ResponseRepository } from "@src/repository/response";
import { generateUUID } from "@src/utils/generatedUUID";

export class ExtractKeyWordsUseCase {
  constructor(private repository: ResponseRepository) {}

  async execute(text: string): Promise<{ content: string }> {
    const id = generateUUID();
    // const {content, prompt} = await keywordExtractor.execute(text);
    const content: string = faker.lorem.paragraph(3);
    const prompt: string = faker.lorem.paragraph(1);
    await this.repository.save({
      id,
      content: Buffer.from(content),
      prompt: Buffer.from(prompt),
    });
    const response = await this.repository.getUnique(id);
    return { content: response.content };
  }
}
