import {Database} from "@/app/_types/supabase";

export type Product = Database["public"]["Tables"]["et_products"]["Row"];

export type Profile = Database["public"]["Tables"]["et_profiles"]["Row"];