import { Schema, model } from "mongoose";
import { logWarn } from "../../helpers/logger";
import i18n from "../i18nManager";

type ApproveMessage =
  | "Projenizdeki verilerden tamamen siz sorumlusunuz. Bu veriler silinecektir. Onaylıyor musunuz? (onaylıyorum)"
  | "You are fully responsible for the data in your project. This data will be deleted. Do you confirm? (I confirm)";

const DataSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, default: {} },
});

const DataModel = model("rainstack", DataSchema);

export class MongoDatabase {
  async set(key: string, value: any): Promise<void> {
    const existing = await DataModel.findOne({ key });

    if (existing) {
      existing.value = value;
      await existing.save();
    } else {
      await DataModel.create({ key, value });
    }
  }

  async get(key: string): Promise<any> {
    const data = await DataModel.findOne({ key });
    return data ? data.value : null;
  }

  async getAll(): Promise<Record<string, any>> {
    const all = await DataModel.find();
    const result: Record<string, any> = {};
    all.forEach((doc) => {
      result[doc.key] = doc.value;
    });
    return result;
  }

  async has(key: string): Promise<boolean> {
    const exists = await DataModel.exists({ key });
    return !!exists;
  }

  async delete(key: string): Promise<void> {
    await DataModel.deleteOne({ key });
  }

  async deleteAll(message: ApproveMessage): Promise<void> {
    if (!message) {
      logWarn(i18n.t("logger.warn.entered"));
      return;
    }
    await DataModel.deleteMany({});
  }

  async push(key: string, value: any): Promise<void> {
    const existing = await DataModel.findOne({ key });
    if (!existing) {
      await DataModel.create({ key, value: [value] });
      return;
    }

    if (!Array.isArray(existing.value)) {
      existing.value = [];
    }

    existing.value.push(value);
    await existing.save();
  }

  async unpush(key: string, value?: any): Promise<void> {
    const existing = await DataModel.findOne({ key });
    if (!existing || !Array.isArray(existing.value)) return;

    if (value === undefined) {
      existing.value = [];
    } else {
      existing.value = existing.value.filter((item: any) => item !== value);
    }

    await existing.save();
  }
}
